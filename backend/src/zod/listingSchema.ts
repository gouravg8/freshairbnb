import { z } from "zod";

const listingSchema = z.object({
  owner: z.object({
    id: z.number().int(),
  }),
  userId: z.number().int(),
  title: z.string().max(255),
  description: z.string().max(1500),
  photo: z.array(z.string()),
  price: z.number().int(),
  country: z.string(),
  location: z.string(),
  createdAt: z.date().optional(),
  category: z.array(z.string()),
});

export type Listing = z.infer<typeof listingSchema>;
