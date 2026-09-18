<?php

namespace Database\Seeders;

use App\Models\CurriculumLesson;
use App\Models\CurriculumModule;
use App\Models\Program;
use Illuminate\Database\Seeder;

class CurriculumSeeder extends Seeder
{
    public function run(): void
    {
        $program = Program::where('slug', 'professional-makeup-artistry')->first();
        if (! $program) return;

        $modules = [
            ['Makeup Foundations', 'Build core knowledge of tools, products, hygiene, and professional setup.', ['Tools, Products & Hygiene', 'Workspace & Professional Setup', 'Sanitization & Safety Protocols', 'Color Theory Fundamentals', 'Makeup Application Prep']],
            ['Skin Preparation', 'Prepare different skin types for clean, long-lasting makeup application.', ['Skin Types & Analysis', 'Cleansing Routines', 'Moisturizing & Priming', 'Under-eye & Spot Correction', 'Application Surface Prep']],
            ['Skin Preparation & Complexion', 'Develop complexion techniques, shade matching, and foundation application.', ['HD Undertone Balancing', 'Foundation Shade Mixing Ratios', 'Application Texture & Sheer Layers', 'Full Coverage Techniques', 'Concealing & Correcting Formulations', 'Setting & Long-Wear Finish']],
            ['Eye Makeup', 'Develop eye makeup techniques from everyday looks to more advanced styles.', ['Eye Anatomy & Face Symmetry', 'Classic Day Eye Looks', 'Evening & Smoky Techniques', 'Color Application for Eye Shape', 'Eyeliner Techniques', 'Eyeshadow Blending', 'Completing the Eye Look']],
            ['Brows, Lashes & Definition', 'Shape brows and apply lashes while balancing facial features.', ['Brow Shaping Fundamentals', 'Brow Filling & Definition', 'Lash Application', 'Eye Balance & Feature Correction', 'Refining the Look']],
            ['Bridal Makeup', 'Learn professional bridal preparation, application, and long-wear techniques.', ['Bridal Consultation', 'Bridal Skin Prep', 'Long-Wear Bridal Base', 'Bridal Eye & Features', 'On-Site Bridal Setup', 'Final Touch-Ups & Veil Prep']],
            ['Creative & Editorial Makeup', 'Explore creative techniques, editorial looks, and professional presentation.', ['Editorial Inspiration', 'Avant-Garde Techniques', 'Color & Texture Play', 'Face & Body Painting', 'Presentation & Portfolio Shots']],
            ['Professional Practice', 'Prepare for professional client work, portfolio development, and final practical assessment.', ['Client Consultation & Briefing', 'Portfolio Development', 'Mock Client Sessions', 'Final Practical Assessment Prep', 'Professional Standards & Etiquette', 'Graduation Showcase Preparation']],
        ];

        foreach ($modules as $index => [$title, $description, $lessons]) {
            $module = CurriculumModule::updateOrCreate(
                ['program_id' => $program->id, 'number' => $index + 1],
                ['type' => 'module', 'title' => $title, 'description' => $description, 'status' => 'upcoming', 'sort_order' => $index + 1],
            );

            foreach ($lessons as $lessonIndex => $lessonTitle) {
                CurriculumLesson::updateOrCreate(
                    ['curriculum_module_id' => $module->id, 'sort_order' => $lessonIndex + 1],
                    ['title' => $lessonTitle],
                );
            }
        }
    }
}