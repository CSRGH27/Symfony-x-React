<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;

class InvoiceIncrementationController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        /** @var EntityManagerInterface */
        $this->em = $em;
    }

    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono() + 1);
        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }
}
