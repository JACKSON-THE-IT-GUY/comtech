/**
 * Abubakari Logistics - Unified App Logic
 */

// 1. Fleet Data & Initialization
const fleet = [{
        title: "Pan Double Trailers",
        desc: "Maximum volume capacity for long-distance Southern Africa routes.",
        image: "assets/images/double trailers.jpeg"
    },
    {
        title: "Single Trailers",
        desc: "Versatile regional distribution for standard palletized cargo.",
        image: "assets/images/main.jpeg"
    },
    {
        title: "Container Transport",
        desc: "Specialized logistics for 20ft and 40ft international containers.",
        image: "assets/images/flayer1.jpg"
    },
    {
        title: "Tipper Trucks",
        desc: "Heavy-duty tipping solutions for bulk commodities and mining.",
        image: "assets/images/tipper.jpg"
    }
];

function loadFleet() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = fleet.map(truck => `
        <div class="group bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-700 hover:border-yellow-500/30">
            <div class="h-60 w-full relative bg-zinc-900 overflow-hidden">
                <!-- Image with error handling to show icon if path is wrong -->
                <img src="${truck.image}" 
                     alt="${truck.title}" 
                     class="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition duration-700"
                     onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden')">
                
                <!-- Fallback Icon (Hidden unless image fails) -->
                <div class="hidden absolute inset-0 flex items-center justify-center text-yellow-500/20">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"></path>
                    </svg>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
            <div class="p-8 -mt-10 relative z-10">
                <div class="h-1 w-10 bg-yellow-500 mb-4"></div>
                <h4 class="text-lg font-bold mb-2 uppercase tracking-tight">${truck.title}</h4>
                <p class="text-slate-500 text-xs leading-relaxed font-light">${truck.desc}</p>
            </div>
        </div>
    `).join('');
}

// 2. Email Submission Logic (Using Formspree via AJAX)
const dispatchForm = document.getElementById('dispatchForm');

if (dispatchForm) {
    dispatchForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Find button specifically (using your HTML button ID or tag)
        const button = this.querySelector('button');
        const originalText = button.innerText;

        // Visual Feedback: Loading
        button.innerText = "SENDING...";
        button.disabled = true;

        const data = new FormData(this);

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Visual Feedback: Success
                button.innerText = "SUCCESSFULLY SENT!";
                button.style.backgroundColor = "#22c55e"; // Success Green
                this.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            // Visual Feedback: Error
            button.innerText = "FAILED. TRY AGAIN";
            button.style.backgroundColor = "#ef4444"; // Error Red
        }

        // Reset button state after 3 seconds
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = "";
            button.disabled = false;
        }, 3000);
    });
}
// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-2', 'bg-[#050505]/90', 'border-yellow-500/10');
        nav.classList.remove('py-4', 'bg-transparent');
    } else {
        nav.classList.add('py-4', 'bg-transparent');
        nav.classList.remove('py-2', 'bg-[#050505]/90', 'border-yellow-500/10');
    }
});

// 3. Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', loadFleet);