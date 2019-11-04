<?php

namespace App\Http\Middleware;

use App\Acl as AclModel;
use Closure;

class Acl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = auth()->user()->getAttributes();
        $action = $request->route()->getAction();

        $resource = substr($action['controller'], strrpos($action['controller'], '\\') + 1);

        $permissions = AclModel::where('role', '=', $user['role'])
                               ->where('resource', '=', $resource);

        if (!$permissions->exists()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
