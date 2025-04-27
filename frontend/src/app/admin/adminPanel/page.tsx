"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "@/lib/utils";
import { ProductFormValues } from "@/types/product";

const AdminPanel = () => {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      price: "",
      image: "",
      imageData: [] as string[],
      imagePath: null,
      description: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      form.setValue("imagePath", files?.[0] ?? null);

      const readers = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then((imagesData) => {
        form.setValue("imageData", imagesData);
      });
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (data.imagePath) {
      formData.append("image", data.imagePath);
    }
    await axios.post(apiBaseUrl + "/product/add", formData).then(() => {
      toast.success("Product added");
      form.reset();
    });
  };

  return (
    <div className="w-[50%] mx-auto mt-25">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Product Name is required" }}
              render={({ field }) => (
                <FormItem className="w-[80%]">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Price */}
            <FormField
              control={form.control}
              name="price"
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} id="price" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Product Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-5 ">
                <FormLabel>Description</FormLabel>
                <FormControl className="border-1 p-2">
                  <textarea {...field} id="description" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Image */}
          <div className="flex">
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="image"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handleImageChange(e);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-5">
            Add Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminPanel;
