---
title:  "Svelte First Steps: A Comprehensive Journey"
search: false
categories: 
  - Web/Svelte
date: 2024-01-11
last_modified_at: 2024-01-11T08:06:00-05:00
share: linkedin
---

<!-- these days, I want to learn svelte by client's request, I work nowdays at react's projects 
but a listeng from cowrokers and friend svelt is getting relevance, 
so the client recomend me a good youtube course, [svelte makigas course](https://www.makigas.es/series/svelte),
in 32  shorts videos explain in a good way how scratch svelte, learn the paradigm abot slvete framwork
,it's improves the coding with less sentences than usual frontend frameworks (Angular,React,VUE)


I saw every video, I seachred at github a repo for practice and complete all course code, 
I created my own and I created a PR to the oficial repository to improve the quality of this free course 
at the web  all the code explained was created by makigas(original owner) 
but in this post I explain each component  -->
In response to a client's request, I decided to delve into Svelte, 
despite my current focus on React projects. With recommendations pouring in from 
colleagues and friends about Svelte's rising popularity, I embarked on a learning journey.

The suggested starting point was the "Svelte Makigas Course" by Makigas. 
Comprising 32 concise videos, this course offers a thorough exploration of Svelte, 
unraveling its paradigm and emphasizing concise coding compared to other frontend 
frameworks like Angular, React, and Vue.

After diligently watching every video, I scoured GitHub for a practice repository, 
completing all course code. Not stopping there, I created my repository, making improvements, 
and submitted a PR to the official repository, aiming to enhance the quality of this invaluable 
free resource. While Makigas is the original creator of the code, this post elaborates on each 
component, providing a deeper understanding.

#  Code Repository 

All resources associated with this post can be found at [tutorial-svelte](https://github.com/Qleoz12/tutorial-svelte). Feel free to explore and consider giving it a star if you find it helpful.


## 1. ColorPicker.svelte

```html
<script>
    export let choices = ["red", "yellow","orange", "blue", "green"];
    export let value = choices[0];

    let backgrounds={
        red: 'silver',
        ornage: 'darkblue',
        blue:'yellow',
        green:'purple'
    }
</script>

<main>
    <p 
    style:--bgcolor={backgrounds[value]}
    style:--fgcolor={value}
    class="color"
     >
        {value}
    </p>
    <select bind:value>
        {#each choices as choice}
            <option value={choice}>{choice}</option>
        {/each}
    </select>
</main>

<style>
    .color {
        background-color: var(--bgcolor);
        color: var(--fgcolor);

        font-size: 40px;
        margin: 0;
        line-height: 1;
        font-weight: bold;
    }
</style>
```
## Explanation:

- choices and value are exported for external interaction.
- backgrounds maps color choices to background colors.
- The main part dynamically sets background and text color based on the selected value.
- A dropdown (select) is provided for color selection.
- CSS variables are used for styling flexibility.

the purpuose of this lesson is show, how we can link JS variables with CSS variables for get
flexibility at complex scenarios for our styling components and interactivity

we bind --bgcolor(cssvariable)with js variable backgrounds, wich is a dictionary that allow load dinamically \
the background when we change the select, the same for --fgcolor and value


## CounterForm.svelte
```html
<script>
    let contador = 0;
    let disabled = false;

    let valor = "svelte";

    function desactivar(e) {
        disabled = true;
    }

    const inc = () => (contador = contador + 1);
    const dec = () => (contador = contador - 1);
</script>

<main>
    <form action="/search" method="POST" on:submit|preventDefault={desactivar}>
        <p>
            <input type="text" bind:value={valor} {disabled} />
            <button type="submit" value="Buscar" {disabled}>Buscar</button>
        </p>
    </form>
    <h1>
        <button type="button"  on:click={dec}>-</button>
        {contador}
        <button type="button"  on:click={inc}>+</button>
    </h1>
</main>
```

## Explanation:

- contador, disabled, and valor are reactive variables.
- desactivar function sets disabled to true on form submission.
- Buttons and input fields are provided for incrementing/decrementing contador and submitting a form.
- bind:value is used for two-way binding with the input field.


## NameForm.svelte

```html
<script>
    import Input from '../lib/Input.svelte';
  
    let nombre="John"
    let apellido="Doe"

    let nombreCompleto;
    $: {
        nombreCompleto = `${nombre} ${apellido}`;
    }
</script>
  
<main>
    <fieldset>
        <Input bind:value={nombre} label="Nombre" identifier="nombre" />
        <Input bind:value={apellido} label="Apellido"  identifier="apellido"/>
    </fieldset>

    <p class="label"> Tu eres <strong>{nombreCompleto}</strong></p>
</main>
```

## Explanation:

- Imports Input component from '../lib/Input.svelte'.
- nombre and apellido are reactive variables.
- nombreCompleto is calculated using a reactive statement.
- Renders two input fields using the Input component for name and surname.
- Displays the full name below the input fields.

## EmployeeForm.svelte

```html
<script>
    import Input from '../lib/Input.svelte';
    import Dropdown from '../lib/Dropdown.svelte';
    import Rangos from '../lib/Rangos.svelte';
  
    let estado = {
      nombre: 'Pepita',
      apellido: 'Flores',
      sector: 'Frontend',
      salario: {
        min: 30000,
        max: 45000,
      },
    }
  
    let error = null;
  
    let sectores = ['Backend', 'Frontend', 'Devops', 'QA'];
  
    function envio(e) {
      e.preventDefault();
      alert(JSON.stringify(estado));
    }
  
    function actualizarSalario(e) {
      estado.salario.min = e.detail.min;
      estado.salario.max = e.detail.max;
      if (estado.salario.min > estado.salario.max) {
        error = "No puedes tener más en el mínimo que en el máximo";
      } else {
        error = null;
      }
    }
</script>
  
<main>
    <form on:submit={envio}>
      <Input identifier="nombre" label="Nombre" bind:value={estado.nombre} />
      <Input identifier="apellido" label="Apellido" bind:value={estado.apellido} />
      <Dropdown identifier="sector" label="Sector" choices={sectores} bind:value={estado.sector} />
      <Rangos identifier="salarios" label="Salarios" min={estado.salario.min} max={estado.salario.max} on:update={actualizarSalario} />
      {#if error != null}
        <p>{error}</p>
      {/if}
      <p>
        <input type="submit" value="Enviar" disabled={error !== null} />
      </p>
    </form>
</main>
```

## Explanation:

- Imports Input, Dropdown, and Rangos components.
- estado holds employee information with default values.
- Form with various input fields for employee details.
- Displays an error message if the minimum salary is greater than the maximum.
- Submits the form on button click, showing an alert with employee details.
 

## MenuSection.svelte
```html
<script>
    import Section from "../lib/section.svelte";
</script>
<section>
    <Section titulo="menu del día">
        <section slot="main">
            <p>chopitos</p>
            <p>pescado</p>
            <p>fruta del día</p>
        </section>
    </Section>

    <Section titulo="menu del día">
        <svelte:fragment slot="main">
            <p>chopitos</p>
            <p>pescado</p>
            <p>fruta del día</p>
        </svelte:fragment>
    </Section>

    <Section titulo="cafés"></Section>
</section>
```
## Explanation:

- Imports Section component.
- Uses the Section component to create different sections with titles.
- Demonstrates using both the slot attribute and svelte:fragment for content insertion.


## App.svelte

```html
<script>
    export let name;

    function no(){
        alert("No puedes copiar");
    }
</script>
<svelte:head>
    <title>demo title</title>
</svelte:head>

<svelte:body on:contextmenu|preventDefault={no}/>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
```

## Explanation:

- Exports name as a prop.
- Uses svelte:head to set the document title.
- Uses svelte:body to prevent the context menu on right-click.
- Displays a simple greeting and a link to the Svelte tutorial.
- Responsive styling with a maximum width of 240px.


## CounterClick.svelte

```html
<script>
    import Counter from '../lib/counterClick.svelte';
</script>

<main>
    <Counter />
</main>
```

## Explanation:

- Imports the Counter component.
- Places the Counter component in the main content area.


## StyledNameForm.svelte

```html
<script>
    import Input from '../lib/Input.svelte';
  
    let nombre="John"
    let apellido="Doe"
</script>
  
<main>
    <fieldset>
        <Input bind:value={nombre} label="Nombre" identifier="nombre" />
        <Input bind:value={apellido} label="Apellido"  identifier="apellido"/>
    </fieldset>

    <p class="label"> Tu eres <strong>{nombre} {apellido}</strong></p>
</main>

<style>
    .label{
        color:aqua;
        font-size: 1.3rem;
    }
</style>
```

## Explanation:

- Imports Input component.
- Uses the same form as NameForm.svelte but adds styling.
- Applies a custom style to the label using the .label class.


## GlobalCSSPractice.svelte

```html
<script>
    import Input from '../lib/Input.svelte';
   
    let nombre="John"
    let apellido="Doe"
</script>
  
<main>

    <h2>Practicar para CSS global</h2>
    <ul>
      <li>Si un componente tiene un global CSS solo se aplica durante la presencia de dicho componente.</li>
      <li>Si se tiene muchos estilos globales, es preferible tener una hoja de estilos e importarla.</li>
    </ul>
    <fieldset>
        <Input bind:value={nombre} label="Nombre" identifier="nombre" />
        <Input bind:value={apellido} label="Apellido"  identifier="apellido"/>
    </fieldset>

    <p class="label"> Tu eres <strong>{nombre} {apellido}</strong></p>
</main>
  
<style>
    :global(body){
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1rem;
        background-color: #424769;
    }

    :global(*){
        box-sizing: border-box;
    }
</style>
```

##  Navbar.svelte and Router.svelte

```html
<script>
    import Router, { push, replace, location } from "svelte-spa-router";
    import { wrap } from "svelte-spa-router/wrap";
    import Navbar from "./navbar.svelte";
    import { routes } from "./routes";

    function routeLoaded(event) {
        console.log("routeLoaded event");
        console.log("Component", event.detail.component);
        console.log("Name", event.detail.name);
    }
</script>

<main>
    <Navbar />
    <Router {routes} on:routeLoaded={routeLoaded} />
</main>
```

## Explanation:

- Imports necessary components and functions for routing.
- Uses Navbar component to display navigation links.
- Utilizes Router to handle route changes and loads components dynamically.
- routeLoaded function logs information about the loaded route.


11. Menu.svelte

```html
<script>
    import { routes } from "./routes";

    const routesArray = Object.entries(routes).map(([path, config]) => ({
        path,
        ...config.props,
    }));
</script>

<ul>
    {#each routesArray as { path, name }}
        <li><a href={`/#${path}`}>{name}</a></li>
    {/each}
</ul>

<style>
    ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        background-color: #333;
    }

    li {
        padding: 15px;
        color: #fff;
        cursor: pointer;
    }

    li:hover {
        background-color: #555;
    }

    a {
        margin: auto;
        padding: 0;
        height: 100%;
    }

    a:visited {
        color: aliceblue;
    }
</style>
```

## Explanation:

- Imports routes from the routes file.
- Creates an array of routes for navigation.
- Displays a list of navigation links using an unordered list (ul).
- Applies styling to the list items and links.
- This covers the main components and their functionalities. Each component serves a specific purpose, from handling color selection to managing forms, and navigating through different sections of the application.


## Conclusion:


## References
- https://www.makigas.es/series/svelte
- https://www.youtube.com/watch?v=pze2JJj82XA&list=PLTd5ehIj0goM-5mQxXLmCr5nHZX_yc2QT&ab_channel=makigas
- https://github.com/Qleoz12/tutorial-svelte