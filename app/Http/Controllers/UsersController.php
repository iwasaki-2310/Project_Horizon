<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return inertia::render('User/Index', [
            'users' => User::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'email' => ['required', 'email', 'unique:users,email'],
                'family_name' => ['required', 'max:50'],
                'first_name' => ['required', 'max:50'],
                'family_name_kana' => ['required', 'max:50'],
                'first_name_kana' => ['required', 'max:50'],
                'display_name' => ['required', 'max:50'],
                'tel' => ['required', 'max:20'],
                'phrase' => ['required', 'max:100'],
                'encrypted_password' => ['required', 'max:50'],
            ],
            [
                'email.required' => 'メールアドレスを入力してください',
                'email.email' => 'メールアドレスはメールアドレスの形式で入力してください',
                'email.unique' => 'このメールアドレスは既に登録されています',
                'family_name.required' => '性を入力してください',
                'family_name.max' => '性は50文字以内で入力してください',
                'first_name.required' => '名を入力してください',
                'first_name.max' => '名は50文字以内で入力してください',
                'family_name_kana.required' => '性（カナ）を入力してください',
                'family_name_kana.max' => '性（カナ）は50文字以内で入力してください',
                'first_name_kana.required' => '名（カナ）を入力してください',
                'first_name_kana.max' => '名（カナ）は50文字以内で入力してください',
                'display_name.required' => '表示名を入力してください',
                'display_name.max' => '表示名は50文字以内で入力してください',
                'tel.required' => '電話番号を入力してください',
                'tel.max' => '電話番号は20文字以内で入力してください',
                'phrase.required' => '一言を入力してください',
                'phrase.max' => '一言は100文字以内で入力してください',
                'encrypted_password.required' => 'パスワードを入力してください',
                'encrypted_password.max' => 'パスワードは50文字以内で入力してください',
            ]
        );
        $validated['encrypted_password'] = bcrypt($validated['encrypted_password']);
        User::create($validated);
        // return Inertia::location(route('users.index'));
        return redirect()->route('users.index');
    }
}
