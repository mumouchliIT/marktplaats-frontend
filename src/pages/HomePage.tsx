import React, { useEffect, useState } from "react";
import { api } from "../services/api";

type Listing = {
  id?: number;
  title: string;
  price: number;
  category: string;
  location: string;
};

const HomePage = () => {
  const [testMsg, setTestMsg] = useState<string>("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string>("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  async function load() {
    setError("");
    try {
      const res = await api.get<Listing[]>("/listings");
      setListings(res.data);
    } catch (e: any) {
      setError(e?.message || "Failed to load listings");
    }
  }

  async function test() {
    setError("");
    try {
      const res = await api.get<string>("/listings/test");
      setTestMsg(res.data);
    } catch (e: any) {
      setError(e?.message || "Test failed");
    }
  }

  async function create() {
    setError("");
    try {
      const payload = {
        title,
        price: Number(price),
        category,
        location,
      };

      await api.post("/listings", payload);

      setTitle("");
      setPrice("");
      setCategory("");
      setLocation("");

      await load();
    } catch (e: any) {
      setError(e?.message || "Create failed");
    }
  }

  async function remove(id?: number) {
    if (!id) return;
    setError("");
    try {
      await api.delete(`/listings/${id}`);
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  }

  useEffect(() => {
    void test();
    void load();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Listing Service UI</h1>

      {error && (
        <div style={{ padding: 10, background: "#ffe5e5" }}>{error}</div>
      )}

      <div style={{ marginTop: 10 }}>
        <b>Test:</b> {testMsg || "No response yet"}
      </div>

      <h2 style={{ marginTop: 20 }}>Create Listing</h2>

      <div style={{ display: "grid", gap: 8, maxWidth: 400 }}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={create} disabled={!title || !price || !category || !location}>
          Create
        </button>
      </div>

      <h2 style={{ marginTop: 20 }}>Listings</h2>
      <button onClick={load}>Refresh</button>

      <div style={{ marginTop: 10 }}>
        {listings.length === 0 ? (
          <div>No listings</div>
        ) : (
          listings.map((l) => (
            <div
              key={l.id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                marginBottom: 8,
                borderRadius: 6,
              }}
            >
              <div>
                <b>ID:</b> {l.id}
              </div>
              <div>
                <b>Title:</b> {l.title}
              </div>
              <div>
                <b>Price:</b> {l.price}
              </div>
              <div>
                <b>Category:</b> {l.category}
              </div>
              <div>
                <b>Location:</b> {l.location}
              </div>

              <button onClick={() => remove(l.id)} style={{ marginTop: 8 }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
