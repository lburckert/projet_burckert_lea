<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Orderdetail
 *
 * @ORM\Table(name="orderdetail", indexes={@ORM\Index(name="IDX_27A0E7F2E1C1B809", columns={"orderheader_id"}), @ORM\Index(name="IDX_27A0E7F24584665A", columns={"product_id"})})
 * @ORM\Entity
 */
class Orderdetail
{
    /**
     * @var int
     *
     * @ORM\Column(name="orderdetail_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="orderdetail_orderdetail_id_seq", allocationSize=1, initialValue=1)
     */
    private $orderdetailId;

    /**
     * @var \Orderheader
     *
     * @ORM\ManyToOne(targetEntity="Orderheader")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="orderheader_id", referencedColumnName="orderheader_id")
     * })
     */
    private $orderheader;

    /**
     * @var \Product
     *
     * @ORM\ManyToOne(targetEntity="Product")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="product_id", referencedColumnName="product_id")
     * })
     */
    private $product;


    /**
     * Get orderdetailId.
     *
     * @return int
     */
    public function getOrderdetailId()
    {
        return $this->orderdetailId;
    }

    /**
     * Set orderheader.
     *
     * @param \Orderheader|null $orderheader
     *
     * @return Orderdetail
     */
    public function setOrderheader(\Orderheader $orderheader = null)
    {
        $this->orderheader = $orderheader;

        return $this;
    }

    /**
     * Get orderheader.
     *
     * @return \Orderheader|null
     */
    public function getOrderheader()
    {
        return $this->orderheader;
    }

    /**
     * Set product.
     *
     * @param \Product|null $product
     *
     * @return Orderdetail
     */
    public function setProduct(\Product $product = null)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * Get product.
     *
     * @return \Product|null
     */
    public function getProduct()
    {
        return $this->product;
    }
}
