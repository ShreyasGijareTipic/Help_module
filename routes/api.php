<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\ProductController; 
use App\Http\Controllers\FileUpload;
use App\Http\Controllers\FaqController;

use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketDetailController;

Route::post('ticket-details', [TicketDetailController::class, 'storeTicketDetails']);
Route::put('ticket-details/{id}', [TicketDetailController::class, 'updateTicketDetails']);

Route::post('/tickets', [TicketController::class, 'storeTicketWithScreenshots']);
Route::post('/tickets/upload', [TicketController::class, 'uploadFiles']);
Route::get('/tickets', [TicketController::class, 'getTickets']);
Route::get('/tickets/{id}', [TicketController::class, 'showTicket']);
Route::put('/tickets/{id}', [TicketController::class, 'updateTicket']);
Route::delete('/tickets/{id}', [TicketController::class, 'deleteTicket']);
Route::get('/tickets/assign/{id}', [TicketController::class, 'fetchTicketForAssignment']);
Route::post('/tickets/assign', [TicketController::class, 'saveAssignment']);
Route::post('/tickets/update-status/{id}', [TicketController::class, 'updateTicketStatus']);
Route::get('/tickets/history/{id}', [TicketController::class, 'getTicketHistory']);


 

//public API's
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/mobileLogin',[AuthController::class, 'mobileLogin']);
//Secured API's
Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::post('/changePassword',[AuthController::class, 'changePassword']);
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::post('/registerUser',[AuthController::class, 'registerUser']);
    Route::put('/appUsers',[AuthController::class, 'update']);
    Route::get('/appUsers',[AuthController::class, 'allUsers']);
    Route::get('/getAllProductId',[ProductController::class, 'showById']);
    Route::get('/getProductBy/{id}',[ProductController::class, 'show']);
    Route::post('/createProductId', [ProductController::class, 'store']);
    // Route::resource('product',ProductController::class);
    // Route::post('/createFaq', [FaqController::class, 'create']);
    Route::get('/faqs/product/{product_id}', [FaqController::class, 'getFaqsByProductId']);
    Route::post('/createFaq', [FaqController::class, 'addFaq']);
    Route::get('/faqs/user', [FaqController::class, 'getFaqsByLoginUser']);
    Route::put('/faqs/{id}', [FaqController::class, 'updateFaq']);
    Route::delete('/faqs/{id}', [FaqController::class, 'deleteFaq']);


    Route::post('/newStock',[ProductController::class, 'newStock'])->name('newStock');
    Route::get('/lowStock',[ProductController::class, 'lowStock'])->name('lowStock');
    Route::post('/uploadFile', [FileUpload::class, 'fileUpload'])->name('fileUpload');
    Route::post('/uploadFiles', [FileUpload::class, 'filesUpload'])->name('filesUpload');
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Admin-specific routes can be added here
    });
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    // User-specific routes can be added here
});

