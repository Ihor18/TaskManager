<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('Task',TaskController::class)->except(['create','edit']);
Route::resource('Todo',\App\Http\Controllers\TodoController::class)->except(['create','edit']);
Route::get('Task/Sort/{param}',[TaskController::class, 'sort']);
