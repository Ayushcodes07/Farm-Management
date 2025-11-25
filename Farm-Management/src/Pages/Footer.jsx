export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="col-span-1">
            <div className="mb-4">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              We are custom home builder located in Dallas, TX serving Highland
              Park, <span className="font-semibold">Cultivo</span> & Preston
              Hollow!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 11-3.14 1.53 4 4 0 00.57-2.81c-.1.02-.2.05-.3.05A10.9 10.9 0 0123 3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.647 1.175-1.569 2.868-1.569 2.049 0 3.586 1.336 3.586 4.23v5.621zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.968.771-1.71 1.958-1.71 1.187 0 1.914.742 1.939 1.71 0 .951-.752 1.71-1.982 1.71zm1.581 11.019H3.656V8.809h3.262v11.643zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resource Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              RESOURCE
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Customer Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Payments
                </a>
              </li>
            </ul>
          </div>

          {/* Career & Help Column */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                CAREER
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Hiring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Tips & Tricks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">HELP</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Address & Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 py-8 border-t border-gray-200">
          {/* Address 1 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              ADDRESS
            </h3>
            <p className="text-sm text-gray-900">
              1901 Thornridge Cir.
              <br />
              Shiloh, Hawaii 81063
            </p>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">PHONE</h3>
            <p className="text-sm text-gray-900">(303) 873-2983</p>
          </div>

          {/* Address 2 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              ADDRESS
            </h3>
            <p className="text-sm text-gray-900">
              1901 Thornridge Cir.
              <br />
              Shiloh, Hawaii
            </p>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">EMAIL</h3>
            <p className="text-sm text-gray-900">hallo.cultivo@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© Copyright 2025, All Rights Reserved</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900">
                FAQ
              </a>
              <a href="#" className="hover:text-gray-900">
                Term of Service
              </a>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
