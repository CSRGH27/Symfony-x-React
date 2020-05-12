<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ApiResource(
 *  subresourceOperations={
 *      "api_customers_invoices_get_subresource"={
 *          "normalization_context"={"groups"={"invoices_subresource"}}         
 *      }
 * },
 *  itemOperations={"GET", "PUT", "DELETE", "increment"={
 *              "method"="post", 
 *              "path"="/invoices/{id}/increment",
 *              "controller"="App\Controller\InvoiceIncrementationController", 
 *              "swagger_context"={
 *                  "summary"="Incremente une facture",
 *                  "description"="Incremente une facture"
 *              }
 *          }
 * },
 *  normalizationContext={"groups"={"invoices_read"}},
 *  denormalizationContext={"disable_type_enforcement"="true"}
 * )
 *       
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="The amount of the invoice is required")
     * @Assert\Type(type="numeric", message="The amount of the invoice must be numeric")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type("\DateTimeInterface", message="The sending date must be in the format YYYY/MM/DD")
     * @Assert\NotBlank(message="The sending date is required")
     * 
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="The status is required")
     * @Assert\Choice(choices={"SENT", "PAID", "CANCELLED"}, message="The status must be 'SENT' 'PAID' or 'CANCELLED'")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="The customer is required")
     * @
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="The chrono is required")
     * Assert\Type(type="integer", message="The amount of the chrono must be a number")
     */
    private $chrono;


    /**
     * get user from customer invoice
     * @Groups({"invoices_read", "invoices_subresource"})
     *
     * @return User
     */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
