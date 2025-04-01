<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modern UI Interface</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Inter", sans-serif;
      }
    </style>
  </head>
  <body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <span class="text-xl font-bold text-indigo-600">Logo</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-gray-700 hover:text-indigo-600 transition"
              >Home</a
            >
            <a href="#" class="text-gray-700 hover:text-indigo-600 transition"
              >Features</a
            >
            <a href="#" class="text-gray-700 hover:text-indigo-600 transition"
              >Pricing</a
            >
            <a href="#" class="text-gray-700 hover:text-indigo-600 transition"
              >Contact</a
            >
          </div>
          <div class="flex items-center">
            <button
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span class="block">Build beautiful</span>
            <span class="block text-indigo-600">interfaces with ease</span>
          </h1>
          <p
            class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            A modern UI interface built with Tailwind CSS that's responsive and
            customizable.
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <a
                href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Primary Action
              </a>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Secondary
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2
            class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
          >
            Features
          </h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            A better way to build interfaces
          </p>
        </div>

        <div class="mt-10">
          <div
            class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10"
          >
            <!-- Feature 1 -->
            <div class="relative">
              <div
                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
              >
                <i class="fas fa-mobile-alt"></i>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Responsive Design
              </p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Looks great on all devices from mobile to desktop.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="relative">
              <div
                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
              >
                <i class="fas fa-bolt"></i>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Fast Performance
              </p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Optimized for speed and smooth animations.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="relative">
              <div
                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
              >
                <i class="fas fa-cog"></i>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                Easy Customization
              </p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Change colors, fonts and layouts with simple classes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white">
      <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          class="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900"
              >About</a
            >
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900"
              >Blog</a
            >
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900"
              >Jobs</a
            >
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900"
              >Press</a
            >
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900"
              >Accessibility</a
            >
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900"
              >Partners</a
            >
          </div>
        </nav>
        <div class="mt-8 flex justify-center space-x-6">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <p class="mt-8 text-center text-base text-gray-400">
          &copy; 2023 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  </body>
</html>
