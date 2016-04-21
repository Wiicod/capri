<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string("nom")->unique();
            $table->text("description");
            $table->string("image");

        });
        Schema::table('users', function (Blueprint $table) {
            $table->string("login")->unique();
            $table->tinyInteger("statut")->unique();
        });

        Schema::create('produits', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('nom')->unique();
            $table->float('prix');
            $table->string('localisation');
            $table->string('etat');
            $table->string('acontacter');
            $table->text("description");
            $table->integer('categorie_id')->unsigned()->nullable();
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('set null');
        });

        Schema::create('imageps', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image');
            $table->integer('produit_id')->unsigned()->index();
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');
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
        Schema::drop('imageps');
        Schema::drop('produits');
        Schema::drop('categories');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('login');
            $table->dropColumn('statut');
        });
    }
}
