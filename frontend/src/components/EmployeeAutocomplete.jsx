import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, List, ListItem, Typography, Chip, IconButton } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const EmployeeAutocomplete = ({ 
  placeholder = "Search employee...", 
  onSelect, 
  selectedEmployees = [], 
  onRemove,
  sx = {} 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/employee-search?query=${encodeURIComponent(query)}&limit=10`);
        const data = await response.json();
        
        if (data.success) {
          // Filter out already selected employees
          const filteredSuggestions = data.data.filter(
            emp => !selectedEmployees.some(selected => selected.EmpID === emp.EmpID)
          );
          setSuggestions(filteredSuggestions);
          setShowSuggestions(filteredSuggestions.length > 0);
          setSelectedIndex(-1);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(fetchSuggestions, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, selectedEmployees]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (employee) => {
    onSelect(employee);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = (e) => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        sx={{ width: '100%' }}
        endDecorator={loading ? <Typography level="body3">Searching...</Typography> : null}
      />
      
      {/* Selected employees display */}
      {selectedEmployees.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {selectedEmployees.map((employee) => (
            <Chip
              key={employee.EmpID}
              variant="solid"
              color="primary"
              size="sm"
              endDecorator={
                <IconButton
                  size="sm"
                  onClick={() => onRemove(employee.EmpID)}
                  sx={{ ml: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {employee.EmpName} ({employee.EmpCode})
            </Chip>
          ))}
        </Box>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            bgcolor: 'background.surface',
            border: '1px solid',
            borderColor: 'neutral.300',
            borderRadius: 'sm',
            boxShadow: 'md',
            maxHeight: '200px',
            overflow: 'auto',
            mt: 0.5
          }}
        >
          <List ref={listRef} sx={{ p: 0 }}>
            {suggestions.map((employee, index) => (
              <ListItem
                key={employee.EmpID}
                onClick={() => handleSelect(employee)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selectedIndex === index ? 'primary.50' : 'transparent',
                  '&:hover': {
                    bgcolor: 'primary.100'
                  },
                  borderBottom: index < suggestions.length - 1 ? '1px solid' : 'none',
                  borderColor: 'neutral.200',
                  py: 1,
                  px: 2
                }}
              >
                <Box>
                  <Typography level="body2" fontWeight="md">
                    {employee.EmpName}
                  </Typography>
                  <Typography level="body3" color="neutral">
                    {employee.EmpCode} • {employee.Desg} • {employee.Dept}
                  </Typography>
                  {employee.MobileNo && (
                    <Typography level="body3" color="neutral">
                      📱 {employee.MobileNo}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeAutocomplete;