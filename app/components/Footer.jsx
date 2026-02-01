"use client";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 ">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2  gap-8">
          {/* Logo / About */}
          <div>
            <h2 className="text-xl font-bold text-white">WorkManager</h2>
            <p className="mt-3 text-sm">
              Manage your daily tasks efficiently with our simple and fast task
              manager app.
            </p>
          </div>

        

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm">Email: support@workmanager.com</p>
            <p className="text-sm mt-2">Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 text-center py-4 text-sm">
          © {new Date().getFullYear()} WorkManager. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
