<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{


    /**
     * permet d'enrichir le token
     *
     * @param JWTCreatedEvent $event
     * @return void
     */
    public function updateJwtData(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        $data = $event->getData();
        $data['firstname'] = $user->getFirstName();
        $data['lastname'] = $user->getLastName();

        $event->setData($data);
    }
}
