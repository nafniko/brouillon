// src/modules/menu.js
export function renderMenu(container) {
    container.innerHTML = `
    <div class="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">

        <!-- Header -->
        <header class="navbar bg-base-100 shadow-md px-4">
          <div class="flex-none lg:hidden">
            <label for="my-drawer" class="btn btn-square btn-ghost">
              <i class="fa-solid fa-bars text-xl"></i>
            </label>
          </div>
          <div class="flex-1">
            <a class="btn btn-ghost text-xl">📊 ComptaPro</a>
          </div>
          <div class="flex-1">
            <input type="text" placeholder="Recherche..." class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="flex-none gap-4 items-center">
            <button class="btn btn-ghost btn-circle">
              <i class="fa-solid fa-bell text-xl"></i>
            </button>
            <button class="btn btn-ghost btn-circle">
              <i class="fa-solid fa-gear text-xl"></i>
            </button>
            <div class="avatar">
              <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="" />
              </div>
            </div>
          </div>
        </header>

        <!-- Main content -->
        <main class="flex-1 p-6 overflow-y-auto">
          <h1 class="text-3xl font-bold mb-6">Bienvenue</h1>
          <div id="mainContent"></div>
        </main>
      </div>

      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <aside class="menu p-4 w-64 bg-base-200 text-base-content">
          <h2 class="text-xl font-bold mb-4">Navigation</h2>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#ventes">Ventes</a></li>
            <li><a href="#achats">Achats</a></li>
            <li><a href="#tva">TVA</a></li>
            <li><a href="#facture">Facturation</a></li>
            <li><a href="#devis">Devis</a></li>
            
          </ul>
        </aside>
      </div>
    </div>
  `
}
  