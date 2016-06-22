<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
	Schema::create('votes', function (Blueprint $table)
        {
            $table->increments('id');
            $table->integer('uid');
	       $table->integer('votescore');
	           $table->integer('v_pid');
		
            $table->date('created_at');
            $table->date('modified_at');

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
