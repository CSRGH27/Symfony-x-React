<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use Doctrine\ORM\EntityManagerInterface;

class CustomerDataPersister implements ContextAwareDataPersisterInterface
{
    private $security;
    private $em;

    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Customer;
    }

    public function persist($data, array $context = [])
    {
        $user = $this->security->getUser();
        $data->setUser($user);
        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }

    public function remove($data, array $context = [])
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}
