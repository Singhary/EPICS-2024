import { ArrowRight, Keyboard, Smartphone } from "lucide-react";

export default function Benefits() {
    return (
        <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-800">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-gray-600">
            We provide a range of benefits to help farmers succeed.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Smartphone className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-green-800 font-bold mt-4">Mobile Access</h3>
                <p className="mt-2 text-gray-600">
                Access our platform on the go with our mobile app. Stay informed
                wherever you are.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Keyboard className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-green-800 font-bold mt-4">User-Friendly</h3>
                <p className="mt-2 text-gray-600">
                Our platform is easy to use, even for those with limited tech
                experience.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Keyboard className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-green-800 font-bold mt-4">User-Friendly</h3>
                <p className="mt-2 text-gray-600">
                Our platform is easy to use, even for those with limited tech
                experience.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <Keyboard className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-green-800 font-bold mt-4">User-Friendly</h3>
                <p className="mt-2 text-gray-600">
                Our platform is easy to use, even for those with limited tech
                experience.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <ArrowRight className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-green-800 font-bold mt-4">Seamless Integration</h3>
                <p className="mt-2 text-gray-600">
                Integrate our platform with your existing tools and systems for a
                seamless experience.
                </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <ArrowRight className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="text-green-800 font-bold mt-4">Seamless Integration</h3>
                <p className="mt-2 text-gray-600">
                Integrate our platform with your existing tools and systems for a
                seamless experience.
                </p>
            </div>
            </div>
        </div>
        </section>
    );
}