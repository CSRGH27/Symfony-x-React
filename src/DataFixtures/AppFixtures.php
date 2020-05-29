<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * Undocumented variable
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($u = 0; $u < 40; $u++) {
            $user = new User;
            $chrono = 1;
            $hash = $this->encoder->encodePassword($user, "password");
            $user->setFirstname($faker->firstName())
                ->setEmail($faker->email())
                ->setLastname($faker->lastName())
                ->setPassword($hash);

            $manager->persist($user);


            for ($c = 0; $c < mt_rand(3, 7); $c++) {
                $customer = new Customer;
                $customer->setFirstname($faker->firstName())
                    ->setLastname($faker->lastName())
                    ->setCompany($faker->company())
                    ->setEmail($faker->email())
                    ->setUser($user);

                $manager->persist($customer);

                for ($i = 0; $i < mt_rand(5, 25); $i++) {
                    $invoice = new Invoice;
                    $invoice->setAmount($faker->randomFloat())
                        ->setSentAt($faker->dateTimeBetween('-1 year'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                        ->setCustomer($customer)
                        ->setChrono($chrono);
                    $manager->persist($invoice);
                    $chrono++;
                }
            }
        }
        $manager->flush();
    }
}
