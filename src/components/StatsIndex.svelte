<script>
  import { onMount } from 'svelte';

  let playersArray = [];
  let statsArray = [];
  let statsArrayZamora = [];
  let statsWithImages = [];
  let statsZamoraWithImages = [];
  let isLoading = true;
  let isLoadingZamora = true;

  onMount(async () => {
    const response = await fetch(
      'https://goalwatcher.davidasensi.workers.dev/players'
    );
    const players = await response.json();
    playersArray = players;

    const responsePichichi = await fetch(
      'https://goalwatcher.davidasensi.workers.dev/stats/players/pichichi'
    );
    const statsPichichi = await responsePichichi.json();
    statsArray = statsPichichi;

    const responseZamora = await fetch(
      'https://goalwatcher.davidasensi.workers.dev/stats/players/zamora'
    );
    const statsZamora = await responseZamora.json();
    statsArrayZamora = statsZamora;

    statsWithImages = statsPichichi.map((stat) => {
      let image = null;
      for (const playerArray of playersArray) {
        const player = playerArray.find((p) => stat.name.includes(p.name));
        image =
          !player || player.image.endsWith('.gif')
            ? 'https://goalwatcher.davidasensi.workers.dev/static/logos/no-photo-footballer.jpg'
            : player.image;
      }
      isLoading = false;
      if (statsWithImages === [] || statsWithImages === undefined) {
        isLoading = true;
      }
      return { ...stat, image };
    });

    statsZamoraWithImages = statsZamora.map((stat) => {
      let image = null;
      for (const playerArray of playersArray) {
        const player = playerArray.find((p) => stat.name.includes(p.name));
        image =
          !player || player.image.endsWith('.gif')
            ? 'https://goalwatcher.davidasensi.workers.dev/static/logos/no-photo-footballer.jpg'
            : player.image;
      }
      isLoadingZamora = false;
      if (statsZamoraWithImages === [] || statsZamoraWithImages === undefined) {
        isLoadingZamora = true;
      }
      return { ...stat, image };
    });
  });
</script>

<main>
  <div>
    {#if isLoading}
    <div>
      <svg
        class="text-center"
        width="30"
        height="30"
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill="#EF233C"
      >
        <circle cx="15" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="table table-compact w-full table-zebra">
          <thead>
            <tr>
              <th
                class="text-center bg-gw-grey text-gw-white text-2xl"
                colSpan="3"
              >
                Pichichi
              </th>
            </tr>
            <tr class="text-center">
              <th class="bg-gw-red text-gw-white text-center">Pos</th>
              <td class="bg-gw-red text-gw-white text-center">Nombre</td>
              <td class="bg-gw-red text-gw-white text-center">Goles</td>
            </tr>
          </thead>
          <tbody>
            {#each statsWithImages as { position, value, name, image }}
              <tr key={name}>
                <th class="text-center font-bold px-4 py-2">{position}</th>
                <td class="font-semibold flex gap-2 items-center ">
                  <img class="w-8 h-8 rounded-lg overflow-hidden" src={image} alt={name} />
                  {name}
                </td>
                <td class="text-center font-bold">{value}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
    {#if isLoading}
    <div>
      <svg
        class="text-center"
        width="30"
        height="30"
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill="#EF233C"
      >
        <circle cx="15" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    {:else}
      <div class="overflow-x-auto pt-6">
        <table class="table table-compact w-full table-zebra">
          <thead>
            <tr>
              <th
                class="text-center bg-gw-grey text-gw-white text-2xl"
                colSpan="3"
              >
                Zamora
              </th>
            </tr>
            <tr class="text-center">
              <th class="bg-gw-red text-gw-white text-center">Pos</th>
              <td class="bg-gw-red text-gw-white text-center">Nombre</td>
              <td class="bg-gw-red text-gw-white text-center">Coeficiente</td>
            </tr>
          </thead>
          <tbody>
            {#each statsZamoraWithImages as { position, value, name, image }}
              <tr key={name}>
                <th class="text-center font-bold px-4 py-2">{position}</th>
                <td class="font-semibold flex gap-2 items-center ">
                  <img class="w-8 h-8 rounded-lg overflow-hidden " src={image} alt={name} />
                  {name}
                </td>
                <td class="text-center font-bold">{value}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</main>
