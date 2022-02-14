cmake_minimum_required(VERSION 3.17)

# Name of the project (will be the name of the plugin)
project (audio-processor)
set(CMAKE_CXX_STANDARD 17)

# Don't add this line if you will try_compile with boost.
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Essential include files to build a node addon,
# you should add this line in every CMake.js based project.
include_directories(${CMAKE_JS_INC})

# The enviornmental variable SUPERPOWERED should point to the include directory
include_directories($ENV{SUPERPOWERED})

# Declare the location of the source files
file(GLOB SOURCE_FILES "src/*.cpp" "src/*.h")

# Disable in production
set(CMAKE_FIND_DEBUG_MODE false)

# This line will tell CMake that we're building a shared library
# from the above source files
# named after the project's name

# Windows Libraries
if (WIN32)
    SET(CMAKE_FIND_LIBRARY_SUFFIXES ".lib")
    find_library(
            SUPERPOWERED
            NAMES "SuperpoweredWin142_Release_MD_x64"
            PATHS $ENV{SUPERPOWERED}/libWindows
            REQUIRED
            )
            SET(CMAKE_FIND_LIBRARY_SUFFIXES ".dll")
            target_link_libraries(${PROJECT_NAME} wsock32 ws2_32)
# Apple Libraries
elseif (APPLE)
    SET(CMAKE_FIND_LIBRARY_SUFFIXES ".a")
    find_library(
        SUPERPOWERED
        NAMES "libSuperpoweredAudioOSX.a"
        PATHS $ENV{SUPERPOWERED}/libSuperpoweredAudio.xcframework/macos-arm64_x86_64
        REQUIRED
    )
    # Linux Libraries
elseif (UNIX)
  SET(CMAKE_FIND_LIBRARY_SUFFIXES ".a")
  find_library(
    SUPERPOWERED
    NAMES "SuperpoweredLinuxX86_64"
    PATHS $ENV{SUPERPOWERED}
    REQUIRED
  )
endif ()

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})

# This line will give our library file a .node extension without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Essential library files to link to a node addon,
# you should add this line in every CMake.js based project.
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
target_link_libraries(${PROJECT_NAME} ${SUPERPOWERED})

# Include N-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
add_definitions(-DNAPI_VERSION=6)

message(OUTPUT_VARIABLE)
