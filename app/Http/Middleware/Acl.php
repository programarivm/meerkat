<?php

namespace App\Http\Middleware;

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
        $role = auth()->user()->getAttributes()['role'];
        $resource = substr($request->route()->getActionName(), strrpos($request->route()->getActionName(), '\\') + 1);

        if (!\App\Acl::isAuthorized($role, $resource)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
