<?php

use App\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Restaurant::truncate();

        Restaurant::create([
            'name' => 'Amrutha Lounge',
            'description' => 'Vegan takes on classic comfort & soul food in a modern setting with buffet-style lunch & dinner.',
            'address' => '326 Garratt Ln, Earlsfield, London SW18 4EJ',
            'lat' => 51.443787,
            'lon' => -0.189603
        ]);

        Restaurant::create([
            'name' => 'Bagatelle London',
            'description' => 'Popular establishment featuring elevated French & Mediterranean dishes in a sophisticated setting.',
            'address' => '34 Dover St, Mayfair, London W1S 4NG',
            'lat' => 51.508976,
            'lon' => -0.142492
        ]);

        Restaurant::create([
            'name' => 'Elnecot',
            'description' => 'Narrow, industrial spot offering cocktails, British small plates, weekend brunch & Sunday roasts.',
            'address' => 'Cutting Room Square, 41 Blossom St, Manchester M4 6AJ',
            'lat' => 53.484893,
            'lon' => -2.228754
        ]);

        Restaurant::create([
            'name' => 'Andrew Fairlie',
            'description' => 'Elegant hotel dining room serving a high-end Modern Scottish menu by an acclaimed chef.',
            'address' => 'Gleneagles Hotel, Auchterarder PH3 1NF',
            'lat' => 56.283499,
            'lon' => -3.751733
        ]);

        Restaurant::create([
            'name' => "Holohan's at the Barge",
            'description' => 'This converted barge offers views over the water to enjoy with an inventive European menu.',
            'address' => '1 Lanyon Pl, Belfast BT1 3LG',
            'lat' => 54.597058,
            'lon' => -5.920840
        ]);

        Restaurant::create([
            'name' => 'The Clink Cymru',
            'description' => 'Stylish fine-dining restaurant run by prison inmates serving dishes made with organic Welsh produce.',
            'address' => 'HMP Cardiff, Knox Rd, Cardiff CF24 0UG',
            'lat' => 51.482008,
            'lon' => -3.168856
        ]);
    }
}
