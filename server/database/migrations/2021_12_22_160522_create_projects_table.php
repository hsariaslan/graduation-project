<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('title');
            $table->string('description');
            /*
             * 0: öğrenci veya hoca seçimi için bekliyor
             * 1: hoca tarafından öğrenci projeye kabul edildi, proje geliştirme süreci başladı. assignment tablosuna kayıt oluşturuldu
             * 2: öğrenci tarafından proje teslim edildi
             * 3: projeye not verildi
             */
            $table->unsignedTinyInteger('status')->default(0);
            $table->timestamp('deadline')->nullable();
            $table->string('uploads')->nullable();
            $table->unsignedTinyInteger('score')->nullable();   // 100 üzerinden verilen puan
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
