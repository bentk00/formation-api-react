<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubcriber implements EventSubscriberInterface
{

    /**
     * @var Security
     */
    private $security;

    /**
     * CustomerUserSubcriber constructor.
     * @param $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(ViewEvent $event)
    {
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($customer instanceof Customer && $method == "POST") {

            // Chopper l'utilisateur actuellement connecté
            $user = $this->security->getUser();

            // Assigner l'utilisateur au customer qu'on est en train de créer
            $customer->setUser($user);
        }


    }


}