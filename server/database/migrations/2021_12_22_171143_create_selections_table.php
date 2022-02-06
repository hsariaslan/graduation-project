<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSelectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('selections', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('teacher_id')->nullable();
            $table->unsignedTinyInteger('order')->default(1);   // öğrencinin proje tercihi sırası
            /*
             * 0: hoca onayı bekleniyor
             * 1: hoca onayladı, proje geliştirme süreci başladı
             * 2: hoca reddetti veya süre bittiği için reddedildi
             * 3: projeyi öğrenci sisteme kendisi yükledi ve onay bekliyor
             * 4: projeyi öğrenci sisteme kendisi yükledi ve kabul edildi
             * 5: projeyi öğrenci sisteme kendisi yükledi ve süre içinde kabul eden hoca olmadı
             * 6: sistem rastgele seçim yaptı
             */
            $table->unsignedTinyInteger('status')->default(0);
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('selections');
    }
}
