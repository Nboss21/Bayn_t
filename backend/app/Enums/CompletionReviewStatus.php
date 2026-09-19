<?php

namespace App\Enums;

enum CompletionReviewStatus: string
{
    case ReadyForReview = 'ready_for_review';
    case NeedsCorrection = 'needs_correction';
    case Approved = 'approved';
}
