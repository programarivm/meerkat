<?php

namespace App\Http\Requests;

use App\Acl;
use Illuminate\Foundation\Http\FormRequest;

abstract class AbstractAuthorizedFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $role = auth()->user()->getAttributes()['role'];
        $resource = substr($this->route()->getActionName(), strrpos($this->route()->getActionName(), '\\') + 1);

        return in_array($role, Acl::grantedRoles($resource));
    }
}
