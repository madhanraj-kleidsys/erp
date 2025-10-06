 

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Sheet,
  Card,
  Button,
  Table,
  Input,
  IconButton,
  Divider,
  Modal,
  ModalDialog,
  ModalClose,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
} from "@mui/joy";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Receipt as ReceiptIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

const productSuggestions = [
  "Cotton Yarn",
  "Silk Yarn",
  "Polyester Yarn",
  "Towel Fabric",
  "Microfiber Towel",
  "Cotton Towel",
  "Terry Cloth Towel",
  "Printed Yarn",
];

const descriptionSuggestions = [
  "High quality yarn for knitting",
  "Soft and absorbent towel fabric",
  "Durable polyester yarn",
  "Premium cotton towel with good absorbency",
  "Lightweight microfiber towel",
  "Terry cloth towel for bath use",
  "Bright colored printed yarn",
  "Thread suitable for towel production",
];

// Helper component: Typeahead Input for suggestions

function TypeaheadInput({ value, onChange, suggestions, placeholder }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const popperRef = useRef(null);

  useEffect(() => {
    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setHighlightIndex(-1);
    } else {
      const filtered = suggestions.filter((sugg) =>
        sugg.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setHighlightIndex(-1);
    }
  }, [value, suggestions]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredSuggestions.length) {
        onChange(filteredSuggestions[highlightIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (sugg) => {
    onChange(sugg);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
        sx={{ width: "100%" }}
        onFocus={() => {
          if (filteredSuggestions.length > 0) setShowSuggestions(true);
        }}
        onBlur={() => {
          // Delay hiding to allow click to register
          setTimeout(() => setShowSuggestions(false), 150);
        }}
      />
      {showSuggestions && (
        <Sheet
          ref={popperRef}
          variant="outlined"
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: 150,
            overflowY: "auto",
            bgcolor: "background.body",
            zIndex: 10,
            borderRadius: "sm",
            boxShadow:
              "0px 5px 8px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.08)",
            mt: 0.5,
          }}
        >
          <List size="sm" sx={{ p: 0 }}>
            {filteredSuggestions.map((sugg, i) => (
              <ListItem key={sugg} disablePadding>
                <ListItemButton
                  selected={i === highlightIndex}
                  onClick={() => handleSuggestionClick(sugg)}
                >
                  <ListItemContent>{sugg}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Sheet>
      )}
    </Box>
  );
}

const BillingPage = () => {
  // Product list with edit mode support
  const [products, setProducts] = useState([
    {
      id: 1,
      product: "Cotton Fabric",
      description: "Premium quality cotton fabric for garments",
      price: 25.99,
      quantity: 10,
      total: 259.9,
      isEditing: false,
    },
    {
      id: 2,
      product: "Thread Spool",
      description: "High-strength polyester thread",
      price: 3.5,
      quantity: 50,
      total: 175,
      isEditing: false,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    product: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [showBill, setShowBill] = useState(false);

  // Add new product
  const addProduct = () => {
    if (newProduct.product && newProduct.price && newProduct.quantity) {
      const priceNum = parseFloat(newProduct.price);
      const qtyNum = parseInt(newProduct.quantity);
      if (priceNum > 0 && qtyNum > 0) {
        const product = {
          id: Date.now(),
          product: newProduct.product,
          description: newProduct.description,
          price: priceNum,
          quantity: qtyNum,
          total: priceNum * qtyNum,
          isEditing: false,
        };
        setProducts([...products, product]);
        setNewProduct({ product: "", description: "", price: "", quantity: "" });
      }
    }
  };

  // Remove product by id
  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Update quantity or price or product or description for product by id
  const updateProductField = (id, field, value) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const updated = { ...product, [field]: value };
          if (field === "price" || field === "quantity") {
            const price = field === "price" ? parseFloat(value) || 0 : parseFloat(product.price) || 0;
            const qty = field === "quantity" ? parseInt(value) || 0 : parseInt(product.quantity) || 0;
            updated.total = price * qty;
          }
          return updated;
        }
        return product;
      })
    );
  };

  // Toggle edit mode for product
  const toggleEdit = (id, value) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, isEditing: value } : product
      )
    );
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = () => {
    if (products.length > 0 && customerInfo.name) {
      setShowBill(true);
    }
  };

  const resetForm = () => {
    setProducts([]);
    setCustomerInfo({ name: "", address: "", phone: "", email: "" });
    setShowBill(false);
  };

  const printBill = () => {
    window.print();
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                background:"#77d7faff",
                p: 2,
                borderRadius: "md",
                color: "white",
              }}
            >
              {/* <Typography level="h3" startDecorator={<ReceiptIcon />}> */}
                        <Typography level="h3" fontWeight="lg" sx={{ flexGrow: 1,color:"#ffffffff", textAlign: "center" }}>
            SKPL - Billing System
              </Typography>
              <Box>
                <Button
                  variant="solid"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={printBill}
                  startDecorator={<PrintIcon />}
                >
                  Print
                </Button>
                <Button
                  // variant="outlined"
                  color="primary"
                  startDecorator={<DownloadIcon />}
                >
                  Download
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {/* Customer Information */}
              <Grid xs={12} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    p: 2,
                  }}
                >
                  <Typography
                    level="h5"
                    sx={{ mb: 2, color: "#48c6e9", fontWeight: "bold" }}
                  >
                    Customer Information
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Input
                      placeholder="Customer Name"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      size="md"
                    />
                    <Input
                      placeholder="Address"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, address: e.target.value })
                      }
                      multiline
                      rows={2}
                      size="md"
                    />
                    <Input
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      size="md"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, email: e.target.value })
                      }
                      size="md"
                    />
                  </Box>
                </Card>

                {/* Add Product Form */}
                <Card
                  variant="outlined"
                  sx={{
                    mt: 3,
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    p: 2,
                  }}
                >
                  <Typography
                    level="h5"
                    sx={{ mb: 2, color: "#48c6e9", fontWeight: "bold" }}
                  >
                    Add Product
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TypeaheadInput
                      placeholder="Product Name"
                      value={newProduct.product}
                      onChange={(val) =>
                        setNewProduct({ ...newProduct, product: val })
                      }
                      suggestions={productSuggestions}
                    />
                    <TypeaheadInput
                      placeholder="Description"
                      value={newProduct.description}
                      onChange={(val) =>
                        setNewProduct({ ...newProduct, description: val })
                      }
                      suggestions={descriptionSuggestions}
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      startDecorator="₹"
                      size="md"
                    />
                    <Input
                      placeholder="Quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, quantity: e.target.value })
                      }
                      size="md"
                    />
                    <Button
                      variant="solid"
                      startDecorator={<AddIcon />}
                      onClick={addProduct}
                      disabled={
                        !newProduct.product ||
                        !newProduct.price ||
                        !newProduct.quantity
                      }
                    >
                      Add Product
                    </Button>
                  </Box>
                </Card>
              </Grid>

              {/* Products Table */}
              <Grid xs={12} md={8}>
                <Sheet
                  variant="outlined"
                  sx={{
                    borderRadius: "md",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Table
                    borderAxis="both"
                    sx={{
                      "& thead th": {
                        background:
                          "linear-gradient(45deg, #48c6e9 0%, #6f86d6 100%)",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      },
                      "& tbody tr:hover": {
                        background: "rgba(72, 198, 233, 0.1)",
                      },
                      "& tbody td": {
                        textAlign: "center",
                        verticalAlign: "middle",
                      },
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "5%" }}>S.No</th>
                        <th style={{ width: "15%" }}>Product</th>
                        <th style={{ width: "25%" }}>Description</th>
                        <th style={{ width: "10%" }}>Price (₹)</th>
                        <th style={{ width: "10%" }}>Quantity</th>
                        <th style={{ width: "15%" }}>Total (₹)</th>
                        <th style={{ width: "10%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product.id}>
                          <td>{index + 1}</td>
                          <td>
                            {product.isEditing ? (
                              <TypeaheadInput
                                value={product.product}
                                onChange={(val) =>
                                  updateProductField(product.id, "product", val)
                                }
                                suggestions={productSuggestions}
                              />
                            ) : (
                              product.product
                            )}
                          </td>
                          <td>
                            {product.isEditing ? (
                              <TypeaheadInput
                                value={product.description}
                                onChange={(val) =>
                                  updateProductField(product.id, "description", val)
                                }
                                suggestions={descriptionSuggestions}
                              />
                            ) : (
                              product.description
                            )}
                          </td>
                          <td>
                            {product.isEditing ? (
                              <Input
                                type="number"
                                value={product.price}
                                onChange={(e) =>
                                  updateProductField(
                                    product.id,
                                    "price",
                                    e.target.value
                                  )
                                }
                                startDecorator="₹"
                                size="sm"
                                sx={{ width: 80 }}
                              />
                            ) : (
                              product.price.toFixed(2)
                            )}
                          </td>
                          <td>
                            {product.isEditing ? (
                              <Input
                                type="number"
                                value={product.quantity}
                                onChange={(e) =>
                                  updateProductField(
                                    product.id,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                size="sm"
                                sx={{ width: 80 }}
                              />
                            ) : (
                              product.quantity
                            )}
                          </td>
                          <td>{product.total.toFixed(2)}</td>
                          <td>
                            {product.isEditing ? (
                              <>
                                <IconButton
                                  size="sm"
                                  color="success"
                                  onClick={() => toggleEdit(product.id, false)}
                                  aria-label="Save"
                                >
                                  <CheckIcon />
                                </IconButton>
                                <IconButton
                                  size="sm"
                                  color="neutral"
                                  onClick={() => toggleEdit(product.id, false)}
                                  aria-label="Cancel"
                                >
                                  <CloseIcon />
                                </IconButton>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  size="sm"
                                  color="primary"
                                  onClick={() => toggleEdit(product.id, true)}
                                  aria-label="Edit"
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  color="danger"
                                  size="sm"
                                  onClick={() => removeProduct(product.id)}
                                  aria-label="Delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {products.length === 0 && (
                    <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
                      <Typography level="body1">
                        No products added yet. Start by adding products above.
                      </Typography>
                    </Box>
                  )}
                </Sheet>

                {/* Summary */}
                {products.length > 0 && (
                  <Card
                    variant="outlined"
                    sx={{
                      mt: 3,
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      p: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    >
                      <Typography level="body1">Subtotal:</Typography>
                      <Typography level="body1" textAlign="right">
                        ₹{calculateSubtotal().toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    >
                      <Typography level="body1">Tax (18%):</Typography>
                      <Typography level="body1" textAlign="right">
                        ₹{calculateTax().toFixed(2)}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 3,
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#388e3c",
                      }}
                    >
                      <Typography level="h5">Total:</Typography>
                      <Typography level="h5" textAlign="right">
                        ₹{calculateTotal().toFixed(2)}
                      </Typography>
                    </Box>
                    <Button
                      variant="solid"
                      size="lg"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!customerInfo.name}
                    >
                      Generate Bill
                    </Button>
                  </Card>
                )}
              </Grid>
            </Grid>

            {/* Bill Preview Modal */}
            <Modal open={showBill} onClose={() => setShowBill(false)}>
              <ModalDialog size="lg" sx={{ maxWidth: 600 }}>
                <ModalClose />
                <Typography
                  level="h4"
                  sx={{ textAlign: "center", mb: 3, color: "#48c6e9" }}
                >
                  INVOICE
                </Typography>

                {/* Bill Header */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography level="h5">SKPL</Typography>
                  <Typography level="body2">FashionONE | Garment Division</Typography>
                  <Typography level="body3">
                    Invoice #: INV-{Date.now().toString().slice(-6)}
                  </Typography>
                  <Typography level="body3">
                    Date: {new Date().toLocaleDateString()}
                  </Typography>
                </Box>

                {/* Customer Info */}
                <Box sx={{ mb: 3 }}>
                  <Typography level="body1" fontWeight="bold">
                    Bill To:
                  </Typography>
                  <Typography level="body2">{customerInfo.name}</Typography>
                  <Typography level="body2">{customerInfo.address}</Typography>
                  <Typography level="body2">{customerInfo.phone}</Typography>
                  <Typography level="body2">{customerInfo.email}</Typography>
                </Box>

                {/* Bill Items */}
                <Sheet variant="outlined" sx={{ borderRadius: "sm", mb: 3 }}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.product}</td>
                          <td>{product.quantity}</td>
                          <td>₹{product.price.toFixed(2)}</td>
                          <td>₹{product.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Sheet>

                {/* Bill Summary */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography level="body1">
                    Subtotal: ₹{calculateSubtotal().toFixed(2)}
                  </Typography>
                  <Typography level="body1">
                    Tax (18%): ₹{calculateTax().toFixed(2)}
                  </Typography>
                  <Typography level="h6" sx={{ mt: 1 }}>
                    Grand Total: ₹{calculateTotal().toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Button variant="outlined" onClick={() => setShowBill(false)}>
                    Close
                  </Button>
                  <Button variant="solid" onClick={printBill}>
                    Print Bill
                  </Button>
                  <Button variant="solid" color="success" onClick={resetForm}>
                    New Bill
                  </Button>
                </Box>
              </ModalDialog>
            </Modal>
          </Box>

          
        </Box>
      </Box>
    </CssVarsProvider>
  );

  // function calculateSubtotal() {
  //   return products.reduce((sum, product) => sum + product.total, 0);
  // }

  // function calculateTax() {
  //   return calculateSubtotal() * 0.18;
  // }

  // function calculateTotal() {
  //   return calculateSubtotal() + calculateTax();
  // }
};

export default BillingPage;
