<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
	Schema::create('comments', function (Blueprint $table)
        {
            $table->increments('cid');
            $table->string('commenttext');
            $table->integer('uid');
            $table->string('name');
	    $table->integer('c_pid');
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
    }
}
