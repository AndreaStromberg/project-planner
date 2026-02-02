const projectApp = () => {
  // Hämta element från DOM
  const projectForm = document.querySelector("#project-form")
  const projectList = document.querySelector("#project-list")

  //   FUNKTION FÖR ATT HÖMTA DATA FRÅN FORMULÄRET
  const getData = () => {
    // Hämta in all data från formuläret, namn, datum, mm, spara som FormData Object
    const formData = new FormData(projectForm)

    // Skapa ett JS-objekt av den data som hämtats in från formuläret
    const data = Object.fromEntries(formData.entries())

    // lägger till projektstatus till projektdata
    data.status = ""

    // Skapa ett unikt id för data-objektet
    data.id = crypto.randomUUID()

    // returnera data från formuläret som object
    return data
  }

  //FUNKTION FÖR ATT SKAPA PROJEKT
  const createProject = (event) => {
    // Förebygga att sidan laddas om och allt försvinner ur formuläret
    event.preventDefault()

    // Hämta data från formulär genom att anropa funktion
    const projectData = getData()

    // Hämta ut ProjectData Entries från Objektet
    const createdBy = projectData["created-by"]
      ? // Om namnet finns skrivs det ut
        projectData["created-by"]
      : //   Annars skriver den anonymous
        "anonymous"

    const projectName = projectData["project-name"]
    const projectDueDate = projectData["project-due-date"]
    const projectLink = projectData["project-link"]
    const projectStatus = projectData["status"]
    const projectId = projectData["id"]

    // Kolla om projektet kan skapas
    if (!projectName) return

    // Skapa ett list-item med projektelement
    const projectElement = document.createElement("li")

    // Lägg till dataattribute till listelementet
    projectElement.dataset.id = projectId

    // Skapa en mall för hur projektet ska se ut, project template
    const projectTemplate = `
                    <div 
                        class="flex justify-between items-center border-b border-b-white/5 py-4 hover:bg-white/2 -mx-4 px-4">
                        <!-- Vänstersidan, info om projekten -->
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-sm font-semibold">${projectName}</h3>
                                <span ${projectStatus ? projectStatus : ""}
                                    class="text-xs bg-white/5 outline outline-white/10 -outline-offset-1 py-0.5 px-1.5 founded-sm text-gray-400 font-medium data-archived:bg-amber-400/10 data-archived:text-amber-400 data-archived:outline-amber-400/10 data-completed:bg-green-400/10 data-completed:text-green-400 data-completed:outline-green-400/10">${projectStatus ? projectStatus : "In progress"} </span>

                            </div>

                            <div>
                                <span class="text-xs text-gray-400">${projectDueDate ? "Due on " + projectDueDate : "No due date"} - Created by ${createdBy}</span>

                            </div>
                        </div>


                        <!-- Högersidan, knappar -->
                        <div class="flex items-center gap-4 relative">
                            <a href="${projectLink}
                                class="${!projectLink ? "hidden" : ""} text-sm bg-gray-700 py-1.5 px-3 rounded-sm hover:bg-gray-600 cursor-pointer">View
                                project</a>
                            <button data-project-id="${projectId}" class="settings-button cursor-pointer hover:bg-white/5 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>


                            </button>

                            <div class="settings-menu right-0 bottom-[120%] hidden border border-white/10 bg-gray-900/90 absolute rounded-sm min-w-37.5 ">
                                <ul>

                                    <li>
                                        <button
                                            class="delete-button flex items-center gap-2 py-1.5 px-3 text-sm hover:bg-white/5 w-full cursor-pointer text-gray-400 hover:text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>



                                            <span>Delete</span>
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            class="flex items-center gap-2 py-1.5 px-3 text-sm hover:bg-white/5 w-full cursor-pointer text-gray-400 hover:text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>




                                            <span>Archive</span>
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            class="flex items-center gap-2 py-1.5 px-3 text-sm hover:bg-white/5 w-full cursor-pointer text-gray-400 hover:text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>





                                            <span>Complete</span>
                                        </button>
                                    </li>


                                </ul>
                            </div>
                        </div>

                    </div>`

    // Lägg till templaten i projektelementet
    projectElement.innerHTML = projectTemplate

    // Lägg till projektelementet i listan över projekt
    projectList.append(projectElement)

    // Hämta knappen för projektet
    const settingsButton = projectElement.querySelector(".settings-button")

    // Delete-knapp
    const deleteButton = projectElement.querySelector(".delete-button")

    // Skapa eventlyssnare för knappen
    settingsButton.addEventListener("click", () =>
      openProjectSettings(projectId),
    )

    // Eventlyssnare för deleteknapp
    deleteButton.addEventListener("click", () => deleteProject(projectId))
  }

  // Funktion för att ta bort projekt
  const deleteProject = (id) => {
    if (!id) return

    // Hämta aktuellt projektelement från DOM
    const project = projectList.querySelector(`[data-id="${id}"]`)

    if (!project) return

    project.remove()
  }

  //   Funktion för att öppna projektinställningar
  const openProjectSettings = (id) => {
    if (!id) return

    // Hämta aktuellt projektelement från DOM
    const project = projectList.querySelector(`[data-id="${id}"]`)

    if (!project) return

    // Hämta in alla settings-menu som eventuellt finns i listan med projekt
    const settingsMenus = document.querySelectorAll(
      `.settings-menu:not([data-id="${id}"] .settings-menu)`,
    )

    // Stäng alla settings-menus för att undvika att flera är öppna samtidigt
    settingsMenus.forEach((menu) => menu.classList.add("hidden"))

    // Hämta aktuell setting-menu
    const settingsMenu = project.querySelector(".settings-menu")

    // Visa/dölj aktuell settings-menu
    settingsMenu.classList.toggle("hidden")
    console.log(id)
  }

  //event
  projectForm.addEventListener("submit", createProject)
}

projectApp()
