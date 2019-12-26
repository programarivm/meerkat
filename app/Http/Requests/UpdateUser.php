<?php

namespace App\Http\Requests;

class UpdateUser extends AbstractAuthorizedFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => 'required|max:64',
            'surname' => 'required|max:64',
            'date_of_birth' => 'required|date',
            'phone_number' => 'nullable|numeric',
            'email' => 'required|email',
        ];
    }
}
