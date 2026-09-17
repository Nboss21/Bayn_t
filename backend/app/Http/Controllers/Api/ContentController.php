<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{GalleryImage, NewsletterSubscriber, Program, SiteSetting};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function settings(): array { $s = SiteSetting::query()->first(); return $s?->makeHidden(['logo_path'])->toArray() ?? []; }
    public function updateSettings(Request $r) { $this->admin($r); $data = $r->validate(['institution_name'=>'nullable|string|max:255','contact_email'=>'nullable|email','phone'=>'nullable|string|max:50','address'=>'nullable|string','social_links'=>'nullable|array','about_text'=>'nullable|string','footer_text'=>'nullable|string','logo'=>'nullable|image|max:5120']); $s = SiteSetting::query()->firstOrCreate([]); if ($r->hasFile('logo')) { if ($s->logo_path) Storage::disk('public_assets')->delete($s->logo_path); $data['logo_path'] = $r->file('logo')->store('site','public_assets'); } unset($data['logo']); $s->update($data); return response()->json(['data' => $s->makeHidden(['logo_path'])]); }
    public function gallery(Request $r) { return response()->json(['data' => GalleryImage::with('program')->where('is_public', true)->when($r->filled('category'), fn($q)=>$q->where('category',$r->input('category')))->when($r->integer('program_id'), fn($q,$v)=>$q->where('program_id',$v))->orderBy('sort_order')->paginate(min($r->integer('per_page',20),100))->through(fn($image)=>$this->galleryData($image))]); }
    public function galleryAdmin(Request $r) { $this->admin($r); return response()->json(['data'=>GalleryImage::with('program')->orderBy('sort_order')->paginate(min($r->integer('per_page',20),100))->through(fn($image)=>$this->galleryData($image, true))]); }
    public function showGallery(Request $r, GalleryImage $galleryImage) { $this->admin($r); return response()->json(['data' => $this->galleryData($galleryImage->load('program'), true)]); }
    public function storeGallery(Request $r) { $this->admin($r); $data=$r->validate(['file'=>'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240','category'=>'nullable|string|max:100','program_id'=>'nullable|exists:programs,id','sort_order'=>'nullable|integer|min:0','is_public'=>'nullable|boolean']); $data['file_path']=$r->file('file')->store('gallery','public_assets'); unset($data['file']); $image=GalleryImage::create($data); return response()->json(['data'=>$this->galleryData($image,true)],201); }
    public function updateGallery(Request $r, GalleryImage $galleryImage) { $this->admin($r); $data=$r->validate(['file'=>'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:10240','category'=>'nullable|string|max:100','program_id'=>'nullable|exists:programs,id','sort_order'=>'nullable|integer|min:0','is_public'=>'nullable|boolean']); if ($r->hasFile('file')) { Storage::disk('public_assets')->delete($galleryImage->file_path); $data['file_path']=$r->file('file')->store('gallery','public_assets'); } unset($data['file']); $galleryImage->update($data); return response()->json(['data'=>$this->galleryData($galleryImage->refresh(),true)]); }
    public function deleteGallery(Request $r, GalleryImage $galleryImage) { $this->admin($r); Storage::disk('public_assets')->delete($galleryImage->file_path); $galleryImage->delete(); return response()->json(null,204); }
    public function subscribe(Request $r) { $data=$r->validate(['email'=>'required|email:rfc|max:255']); $subscriber=NewsletterSubscriber::firstOrCreate(['email'=>strtolower($data['email'])],['subscribed_at'=>now()]); return response()->json(['message'=>'Subscription received.','subscribed'=>!$subscriber->wasRecentlyCreated]); }
    private function admin(Request $r): void { abort_unless($r->user()?->isSuperAdmin() || $r->user()?->isRegistrar(),403); }
    private function galleryData(GalleryImage $i, bool $admin=false): array { $data=['id'=>$i->id,'category'=>$i->category,'program_id'=>$i->program_id,'sort_order'=>$i->sort_order,'url'=>Storage::disk('public_assets')->url($i->file_path)]; if($admin)$data['is_public']=$i->is_public; return $data; }
}
