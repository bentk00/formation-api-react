<?php


namespace App\Controller;


use App\Entity\Invoice;
use Doctrine\Persistence\ObjectManager;

class InvoiceCancelController{

    /**
     * @var ObjectManager
     */
    private $manager;

    /**
     * InvoiceIncrementationController constructor.
     * @param ObjectManager $manager
     */
    public function __construct(ObjectManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @param Invoice $data
     */
    public function __invoke(Invoice $data)
    {
        $data->setStatus("CANCELLED");
        $this->manager->flush();
        return $data;
    }
}