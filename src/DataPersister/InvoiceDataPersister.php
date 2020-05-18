<?php

namespace App\DataPersister;

use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\Security\Core\Security;

class InvoiceDataPersister implements ContextAwareDataPersisterInterface
{
    /** @var InvoiceRepository */
    private $invoiceRepository;

    /** @var EntityManagerInterface */
    private $em;

    /** @var Security */
    private $security;

    public function __construct(EntityManagerInterface $em, InvoiceRepository $invoiceRepository, Security $security)
    {
        $this->invoiceRepository = $invoiceRepository;
        $this->em = $em;
        $this->security = $security;
    }

    public function supports($data, array $context = []): bool
    {
        if ($context['collection_operation_name'] === "post") {
            return $data instanceof Invoice;
        } else {
            return false;
        }
    }

    public function persist($data, array $context = [])
    {

        $chrono = $this->invoiceRepository->findNextChrono($this->security->getUser());
        $data->setChrono($chrono);
        if (empty($data->getSentAt())) {
            $data->setSentAt(new DateTime());
        }

        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }

    public function remove($data, array $context = [])
    {
    }
}
