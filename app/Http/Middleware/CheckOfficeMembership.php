<?php

namespace App\Http\Middleware;

use App\Models\Office;
use App\Models\OfficeUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckOfficeMembership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
    public function handle(Request $request, Closure $next): Response
    {
        $officeId = $request->route('office_id');
        $officeInfo = Office::where('id', $officeId)->first();
        $userId = auth()->id();

        if($request->route()->getName() === 'office.password' || $request->route()->getName() === 'office.joinOffice') {
            return $next($request);
        }

        // ログインしていない場合は、ログイン画面に遷移させる
        if(!$userId) {
            return redirect()->route('login');
        }

        // ユーザーがオフィスに参加しているか確認
        $isMemberShip = OfficeUser::where('office_id', $officeId)
            ->where('user_id', $userId)
            ->exists();

        // 未参加の場合はオフィス入室用パスワード画面に遷移させる
        if(!$isMemberShip && !is_null($officeInfo->office_password)) {
            return redirect()->route('office.password', ['office_id' => $officeId]);
        }

        // 参加済みの場合はリクエストを次の処理に進む
        return $next($request);
    }
}
