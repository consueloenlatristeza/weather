
export class WeatherElement extends HTMLElement {
    constructor() {
        super();
    }

    build(day, type, temp, icon) {
        this.innerHTML = `
        <section>
            <div>
                <h4>${day}</h4>
                <span>${type}</span>
                <span>
                    <h2>${temp}°</h2>
                </span>
            </div>
            <div>
                <span class="material-icons">${icon}</span>
            </div>
        </section>
        `;
    }
}