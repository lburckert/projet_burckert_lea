<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Orderheader
 *
 * @ORM\Table(name="orderheader", indexes={@ORM\Index(name="IDX_67D430A019EB6921", columns={"client_id"})})
 * @ORM\Entity
 */
class Orderheader
{
    /**
     * @var int
     *
     * @ORM\Column(name="orderheader_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="orderheader_orderheader_id_seq", allocationSize=1, initialValue=1)
     */
    private $orderheaderId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="reference", type="string", length=255, nullable=true)
     */
    private $reference;

    /**
     * @var float|null
     *
     * @ORM\Column(name="totalprice", type="float", precision=10, scale=0, nullable=true)
     */
    private $totalprice;

    /**
     * @var string|null
     *
     * @ORM\Column(name="devise", type="string", length=5, nullable=true)
     */
    private $devise;

    /**
     * @var float|null
     *
     * @ORM\Column(name="totalitemquantity", type="float", precision=10, scale=0, nullable=true)
     */
    private $totalitemquantity;

    /**
     * @var \Client
     *
     * @ORM\ManyToOne(targetEntity="Client")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="client_id", referencedColumnName="client_id")
     * })
     */
    private $client;


    /**
     * Get orderheaderId.
     *
     * @return int
     */
    public function getOrderheaderId()
    {
        return $this->orderheaderId;
    }

    /**
     * Set reference.
     *
     * @param string|null $reference
     *
     * @return Orderheader
     */
    public function setReference($reference = null)
    {
        $this->reference = $reference;

        return $this;
    }

    /**
     * Get reference.
     *
     * @return string|null
     */
    public function getReference()
    {
        return $this->reference;
    }

    /**
     * Set totalprice.
     *
     * @param float|null $totalprice
     *
     * @return Orderheader
     */
    public function setTotalprice($totalprice = null)
    {
        $this->totalprice = $totalprice;

        return $this;
    }

    /**
     * Get totalprice.
     *
     * @return float|null
     */
    public function getTotalprice()
    {
        return $this->totalprice;
    }

    /**
     * Set devise.
     *
     * @param string|null $devise
     *
     * @return Orderheader
     */
    public function setDevise($devise = null)
    {
        $this->devise = $devise;

        return $this;
    }

    /**
     * Get devise.
     *
     * @return string|null
     */
    public function getDevise()
    {
        return $this->devise;
    }

    /**
     * Set totalitemquantity.
     *
     * @param float|null $totalitemquantity
     *
     * @return Orderheader
     */
    public function setTotalitemquantity($totalitemquantity = null)
    {
        $this->totalitemquantity = $totalitemquantity;

        return $this;
    }

    /**
     * Get totalitemquantity.
     *
     * @return float|null
     */
    public function getTotalitemquantity()
    {
        return $this->totalitemquantity;
    }

    /**
     * Set client.
     *
     * @param \Client|null $client
     *
     * @return Orderheader
     */
    public function setClient(\Client $client = null)
    {
        $this->client = $client;

        return $this;
    }

    /**
     * Get client.
     *
     * @return \Client|null
     */
    public function getClient()
    {
        return $this->client;
    }


    public function getMaxId()
    {
        $qb = $this->createQueryBuilder('u');
        $qb->select('u, MAX(orderheaderId) as idMax');
        return $qb->getQuery()->getSingleResult();
    }
}
