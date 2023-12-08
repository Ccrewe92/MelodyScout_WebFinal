import Layout from "../app/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to MelodyScout</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover and enjoy personalized music recommendations.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
          Get Started
        </button>
      </div>
    </Layout>
  );
}
