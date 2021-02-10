cmake_minimum_required(VERSION 3.17)

# Name of the project (will be the name of the plugin)
project (addon)
set(CMAKE_CXX_STANDARD 17)

# Don't add this line if you will try_compile with boost.
set(CMAKE_CXX_STANDARD_REQUIRED ON)



# Essential include files to build a node addon,
# you should add this line in every CMake.js based project.     
include_directories(${CMAKE_JS_INC})
include_directories(${CMAKE_SOURCE_DIR}/superpowered/Superpowered/)

# Declare the location of the source files
file(GLOB SOURCE_FILES "src/*.cpp" "src/*.h")

# Disable in production
set(CMAKE_FIND_DEBUG_MODE true)

# This line will tell CMake that we're building a shared library
# from the above source files
# named after the project's name

# Windows Libraries
if (WIN32)
    SET(CMAKE_FIND_LIBRARY_SUFFIXES ".lib")
    find_library(
            SUPERPOWERED
            NAMES "SuperpoweredWin142_Release_MD_x64"
            PATHS ${CMAKE_SOURCE_DIR}/superpowered/Superpowered/libWindows
            REQUIRED
            )
            SET(CMAKE_FIND_LIBRARY_SUFFIXES ".dll")
            
endif (WIN32)

# Linux Libraries
if (UNIX)
    SET(CMAKE_FIND_LIBRARY_SUFFIXES ".a")
    find_library(
        SUPERPOWERED
        NAMES "SuperpoweredLinuxX86_64"
        PATHS ${CMAKE_SOURCE_DIR}/superpowered/Superpowered
        REQUIRED
    )
endif (UNIX)
        
        
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})

# This line will give our library file a .node extension without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Essential library files to link to a node addon,
# you should add this line in every CMake.js based project.
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
target_link_libraries(${PROJECT_NAME} ${SUPERPOWERED})

if (WIN32)
    target_link_libraries(${PROJECT_NAME} wsock32 ws2_32)
endif(WIN32)

# Include N-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
add_definitions(-DNAPI_VERSION=3)

message(OUTPUT_VARIABLE)