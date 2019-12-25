<?php

namespace App\Http\Requests;

use App\Acl;
use Illuminate\Foundation\Http\FormRequest;

class StoreReview extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $resource = substr($this->route()->getActionName(), strrpos($this->route()->getActionName(), '\\') + 1);

        return in_array(auth()->user()->getAttributes()['role'], Acl::grantedRoles($resource));
    }

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
