<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckOfficeSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // セッションにoffice_idが無い場合は
        if(!$request->session()->has('office_id')) {
            return redirect()->route('office.joinOffice', ['office_id' => $request->route('office_id')]);
        }
        return $next($request);
    }
}
