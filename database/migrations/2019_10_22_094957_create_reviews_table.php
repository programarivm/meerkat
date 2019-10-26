<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
        Schema::create('reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->tinyInteger('points')
                  ->unsigned();
            $table->string('comment');
            $table->integer('user_id')
                  ->unsigned();
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
            $table->integer('restaurant_id')
                  ->unsigned();
            $table->foreign('restaurant_id')
                  ->references('id')
                  ->on('restaurants')
                  ->onDelete('cascade');
        });
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}
