<?php

namespace App\Http\Requests;

use App\Acl;
use Illuminate\Foundation\Http\FormRequest;

class AuthorizedFormRequest extends FormRequest
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
}
