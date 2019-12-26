<?php

namespace App\Http\Requests;

class StoreRestaurant extends AbstractAuthorizedFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:64',
            'description' => 'required|max:256',
            'address' => 'required|max:256',
            'lat' => 'numeric|between:-90,90',
            'lon' => 'numeric|between:-180,180',
        ];
    }
}
