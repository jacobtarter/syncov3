<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
	Schema::create('posts', function (Blueprint $table)
        {
            $table->increments('pid');
            $table->string('title');
            $table->string('ptext');
            $table->integer('uid');
            $table->string('name');
            $table->date('created_at');
            $table->date('updated_at');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
	Schema::drop('posts');
    }
}
