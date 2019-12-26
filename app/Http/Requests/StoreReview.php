<?php

namespace App\Http\Requests;

class StoreReview extends AuthorizedFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'comment' => 'required|max:256',
            'points' => 'required',
            'restaurant' => 'required',
        ];
    }
}
