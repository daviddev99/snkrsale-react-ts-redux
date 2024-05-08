export const sortOptions = [
    { name: "Most popular" },
    { name: "Price: Low to High" },
    { name: "Price: High to Low" },
  ] as const;

  export const filters = [
    {
      id: "brand",
      name: "Brand",
      options: [
        { value: "Air Jordan", label: "Air Jordan" },
        { value: "Champion", label: "Champion" },
        { value: "Converse", label: "Converse" },
        { value: "Gucci", label: "Gucci" },
        { value: "Nike", label: "Nike" },
        { value: "Vans", label: "Vans" },
        { value: "adidas", label: "Adidas" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "lifestyle", label: "Lifestyle" },
        { value: "basketball", label: "Basketball" },
        { value: "other", label: "Other" },
        { value: "running", label: "Running" },
        { value: "skateboarding", label: "Skateboarding" },
      ],
    },
    {
      id: "gender",
      name: "Gender",
      options: [
        { value: "men", label: "Men" },
        { value: "women", label: "Women" },
        { value: "youth", label: "Youth" },
      ],
    },
  ] as const;
