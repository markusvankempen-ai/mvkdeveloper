import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AdminProducts.css';

const PRODUCTS_URL = `${process.env.PUBLIC_URL}/products.json`;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({ id: '', name: '', type: 'Book', price: '', inventory: '', description: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log('🚀 AdminProducts: Component mounted, fetching products from:', PRODUCTS_URL);
    fetch(PRODUCTS_URL)
      .then(res => {
        console.log('📦 AdminProducts: Fetch response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('✅ AdminProducts: Products loaded successfully:', data);
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ AdminProducts: Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`📝 AdminProducts: Input changed - ${name}:`, value);
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('📋 AdminProducts: Form submitted with state:', formState);
    console.log('🔄 AdminProducts: Is editing mode:', isEditing);
    
    if (isEditing) {
      const updatedProduct = { 
        ...formState, 
        price: parseInt(formState.price * 100), 
        inventory: parseInt(formState.inventory),
        image: formState.image ? `/images/${formState.image}` : ''
      };
      console.log('✏️ AdminProducts: Updating product:', updatedProduct);
      setProducts(products.map(p => p.id === formState.id ? updatedProduct : p));
    } else {
      const newProduct = { 
        ...formState, 
        id: Date.now().toString(), 
        price: parseInt(formState.price * 100), 
        inventory: parseInt(formState.inventory),
        image: formState.image ? `/images/${formState.image}` : ''
      };
      console.log('➕ AdminProducts: Adding new product:', newProduct);
      setProducts([...products, newProduct]);
    }
    
    console.log('🧹 AdminProducts: Resetting form state');
    setFormState({ id: '', name: '', type: 'Book', price: '', inventory: '', description: '', image: '' });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    console.log('✏️ AdminProducts: Edit clicked for product:', product);
    const imageName = product.image ? product.image.replace('/images/', '') : '';
    console.log('🖼️ AdminProducts: Extracted image name:', imageName);
    const editFormState = { ...product, price: product.price / 100, image: imageName };
    console.log('📝 AdminProducts: Setting edit form state:', editFormState);
    setFormState(editFormState);
    setIsEditing(true);
  };
  
  // File upload now handled by label - no need for manual click handler

  const handleImageChange = (e) => {
    console.log('📸 AdminProducts: Image change event triggered');
    console.log('📂 AdminProducts: Files:', e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('📄 AdminProducts: Selected file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
      const filename = file.name;
      console.log('💾 AdminProducts: Setting image filename:', filename);
      setFormState(prevState => {
        const newState = { ...prevState, image: filename };
        console.log('🔄 AdminProducts: Updated form state with image:', newState);
        return newState;
      });
    } else {
      console.log('⚠️ AdminProducts: No file selected or files array is empty');
    }
  };

  const handleDelete = (productId) => {
    console.log('🗑️ AdminProducts: Delete clicked for product ID:', productId);
    setProducts(products.filter(p => p.id !== productId));
    console.log('✅ AdminProducts: Product deleted');
  };

  // Backend save functionality removed - now using copy/paste method only

  const productsJson = JSON.stringify(products, null, 2);
  const imagePreviewUrl = formState.image ? `${process.env.PUBLIC_URL}/images/${formState.image}` : '';

  console.log('🎨 AdminProducts: Current form state:', formState);
  console.log('🖼️ AdminProducts: Image preview URL:', imagePreviewUrl);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="admin-products-container standalone">
      <Link to="/admin" className="back-to-dashboard">‹ Back to Admin Dashboard</Link>
      <h2>Manage Products</h2>
      
      <div className="product-form-container">
        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleFormSubmit}>
          <input name="name" value={formState.name} onChange={handleInputChange} placeholder="Product Name" required />
          <select name="type" value={formState.type} onChange={handleInputChange}>
            <option value="Book">Book</option>
            <option value="CD">CD</option>
          </select>
          <input name="price" type="number" value={formState.price} onChange={handleInputChange} placeholder="Price (in dollars)" required step="0.01" />
          <input name="inventory" type="number" value={formState.inventory} onChange={handleInputChange} placeholder="Inventory" required />
          <textarea name="description" value={formState.description} onChange={handleInputChange} placeholder="Description"></textarea>
          
          <div className="image-input-container">
            <div>
              <label htmlFor="image-upload" className="image-upload-button" style={{ cursor: 'pointer', display: 'inline-block', padding: '8px 16px', backgroundColor: '#007cba', color: 'white', borderRadius: '4px', border: 'none' }}>
                Choose Image
              </label>
              <input 
                ref={fileInputRef}
                id="image-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                onFocus={() => console.log('🎯 AdminProducts: File input focused')}
                onBlur={() => console.log('🌫️ AdminProducts: File input blurred')}
                onClick={() => console.log('👆 AdminProducts: File input clicked')}
                style={{ display: 'none' }}
              />
              {formState.image && <span className="image-filename">{formState.image}</span>}
            </div>
            <img 
              src={imagePreviewUrl} 
              alt="Preview" 
              className="image-preview" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
            />
          </div>

          <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormState({ id: '', name: '', type: 'Book', price: '', inventory: '', description: '', image: '' }); }}>Cancel Edit</button>}
        </form>
      </div>

      <div className="product-list">
        <h3>Existing Products</h3>
        {products.map(product => {
          const imageUrl = product.image
            ? `${process.env.PUBLIC_URL}${product.image.startsWith('/') ? product.image : `/${product.image}`}`
            : '';
          return (
            <div key={product.id} className="product-item-admin">
              <img src={imageUrl} alt={product.name} className="product-item-image" 
                onError={e => { e.currentTarget.style.display = 'none'; }} />
              <span>{product.name}</span>
              <div>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="json-output-container">
        <h3>Generated `products.json`</h3>
        <p>Copy the content below and paste it into your <code>homepage/public/products.json</code> file.</p>
        <textarea readOnly value={productsJson} rows="10" style={{width: '100%', fontFamily: 'monospace'}}></textarea>
        <button onClick={() => navigator.clipboard.writeText(productsJson)}>Copy to Clipboard</button>
      </div>
    </div>
  );
};

export default AdminProducts; 