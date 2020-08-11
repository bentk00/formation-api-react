<?php


namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $createdEvent){
        $user = $createdEvent->getUser();
        $data = $createdEvent->getData();

        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        $createdEvent->setData($data);

    }
}